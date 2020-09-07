// FILE: MtgImport.cs 
// C# program for windows which loads a MySql database from the CSV file from mtgjson.com

using System.Data;
using System.IO;
using System.Linq;
using Excel = Microsoft.Office.Interop.Excel;  // Project -> Add Reference... -> COM -> Microsoft Excel 16.0 Object Library version 1.9
using MySql.Data; // Project -> Add Reference... -> MySql.data 8.0.21
using Microsoft.Office.Interop.Excel;
using DataTable = System.Data.DataTable;
using System.Transactions;

using System;
using System.Collections.Generic;
using System.Text;
using System.Data.OleDb;
using System.Data.Common;
using System.Xml;
using MySqlX.XDevAPI.Relational;
using Google.Protobuf.WellKnownTypes;

namespace MtgImport
{
    class CsvFieldMapping
    {
        public string FieldName;
        public int FieldIndex;
        public int ColumnIndex;

        public CsvFieldMapping(string name, int index, int colIndex)
        {
            FieldName = name;
            FieldIndex = index;
            ColumnIndex = colIndex;
        }
    }
    class MtgImport
    {
        public SortedList<int, int> FieldToColumnMapping;
         int rowsCopied;

        public MtgImport()
        {
            FieldToColumnMapping = new SortedList<int, int>();
            rowsCopied = 0;
        }
        //public string AddField(ref DataTable dtTarget, string name, int index)
        //{
        //    int columnIndex = dtTarget.Columns.IndexOf(name);
        //    if (columnIndex < 0)
        //    {
        //        return $"Column '{name}' was not found in the target table.";
        //    }
        //    else 
        //    {
        //        FieldMapping.Add(index, new CsvFieldMapping(name, index, columnIndex));
        //        return "";
        //    }
        //}
        public string GetTargetTableStructure(string tableName, MySql.Data.MySqlClient.MySqlConnection connection, ref DataTable dtTarget)
        {
            string errorMessage = "";
            System.Console.WriteLine($"Getting the table structure of: '{tableName}'");
            try
            {
                MySql.Data.MySqlClient.MySqlCommand cmd = new MySql.Data.MySqlClient.MySqlCommand($"DELETE FROM {tableName}", connection);
                cmd.CommandTimeout = 300;
                cmd.ExecuteNonQuery();
                cmd.Dispose();

                using (MySql.Data.MySqlClient.MySqlDataAdapter adapter = new MySql.Data.MySqlClient.MySqlDataAdapter($"SELECT * FROM {tableName} WHERE 1=2", connection))
                {
                    adapter.Fill(dtTarget);
                }
            }
            catch (System.Exception e)
            {
                errorMessage = e.Message;
            }
            return errorMessage;
        }
        public string ReadCsvFile(string csvFilePath, ref DataTable dtTarget, string tableName, MySql.Data.MySqlClient.MySqlConnection connection)
        {
            string errorMessage = "";
            int rowNumber = -1;
            int startIndex = 0;
            int endingIndex = 0;
            List<string> fieldValues = new List<string>();
            string fileContents = "";
            string currentLine = "";

            using (System.IO.StreamReader inFile = new StreamReader(csvFilePath))
            {
                fileContents = inFile.ReadToEnd();
                while (true)
                {
                    rowNumber++;
                    currentLine = "";
                    endingIndex = fileContents.IndexOf("\r", startIndex);
                    if (endingIndex < 0)
                    {
                        System.Console.WriteLine($"At eof starting index = {startIndex} of fileContents.length = {fileContents.Length}");
                        break;
                    }
                    if (startIndex >= fileContents.Length)
                    {
                        System.Console.WriteLine($"starting index = {startIndex} at fileContents.length = {fileContents.Length}");
                        break;
                    }
                    if (fileContents[startIndex] == '\n')  startIndex++;
                    System.Console.WriteLine($"Processing {startIndex}...{endingIndex} of fileContents.length = {fileContents.Length}   Rows Copied = {rowsCopied}");
                    currentLine = fileContents.Substring(startIndex, (endingIndex - startIndex));
                    startIndex = endingIndex + 1;
                    int cr = currentLine.IndexOf('\r');
                    if (rowNumber == 0)
                    {
                        string[] fieldNames = currentLine.Split(',');

                        for (int i = 0; i < fieldNames.Length; i++)
                        {
                            if (fieldNames[i] == "") break;

                            int columnIndex = dtTarget.Columns.IndexOf(fieldNames[i]);

                            if (columnIndex < 0)
                            {
                                return $"Field '{fieldNames[i]}' was not found in the target table.";
                            }
                            else
                            {
                                FieldToColumnMapping.Add(i, columnIndex);
                            }
                        }
                    }
                    else
                    {
                        fieldValues.Clear();
                        DataRow dr = dtTarget.NewRow();
                        string parserState = "looking for next field";
                        string currentValue = "";
                        for (int i = 0; i < currentLine.Length; i++)
                        {
                            if (currentLine[i] == '"')
                            {
                                if (parserState.Equals("looking for next field"))
                                {
                                    currentValue = "";
                                    parserState = "inside a string";
                                }
                                else
                                {
                                    if (parserState.Equals("inside a string"))
                                    {
                                        parserState = "found quote inside a string";
                                    }
                                    else
                                    {
                                        if (parserState.Equals("found quote inside a string"))
                                        {
                                            currentValue += '"';
                                            parserState = "inside a string";
                                        }
                                        else
                                        {
                                            // here if the parser state is inside a value
                                            System.Console.WriteLine(currentLine);
                                            System.Console.WriteLine(currentValue);
                                            errorMessage = $"At row {rowNumber} character {i} = '{currentLine[i]}'  with a quotation mark but we are inside a value.";
                                            System.Console.WriteLine(errorMessage);
                                            break;
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if (currentLine[i] == ',')
                                {
                                    if ((parserState.Equals("looking for next field")) || (parserState.Equals("found quote inside a string")) || (parserState.Equals("inside a value")))
                                    {
                                        fieldValues.Add(currentValue);
                                        currentValue = "";
                                        parserState = "looking for next field";
                                    }
                                    else
                                    {
                                        // inside a string...
                                        currentValue += currentLine[i];
                                    }
                                }
                                else
                                {
                                    // here with a character that is not a comma or a quotation mark

                                    if (parserState.Equals("looking for next field"))
                                    {
                                        currentValue += currentLine[i];
                                        parserState = "inside a value";
                                    }
                                    else
                                    {
                                        currentValue += currentLine[i];
                                    }
                                }
                            }
                        }

                        if (errorMessage == "")
                        {
                            for (int fieldIndex = 0; fieldIndex < fieldValues.Count; fieldIndex++)
                            {
                                //int len = fieldValues[fieldIndex].Length;
                                //if (len > 255)
                                //{
                                //    fieldValues[fieldIndex] = fieldValues[fieldIndex].Substring(0, 245) + " TRUNCATED";
                                //}

                                int colIndex = FieldToColumnMapping[fieldIndex];

                                //    System.Console.WriteLine($"row {rowNumber} field {fieldIndex} of {fieldValues.Count}  colIndex {colIndex} of {dr.Table.Columns.Count} ({len}) '{fieldValues[fieldIndex]}'");

                                if ((0 <= colIndex) && (colIndex < dr.Table.Columns.Count))
                                {
                                    dr[colIndex] = fieldValues[fieldIndex];
                                }
                            }
                            //System.Console.WriteLine($"\rrow {rowNumber}");
                            dtTarget.Rows.Add(dr);

                            if (errorMessage == "")
                            {
                                if (dtTarget.Rows.Count >= 1000)
                                {
                                    errorMessage = LoadDataToTargetTable(tableName, connection, ref dtTarget);
                                    dtTarget.Rows.Clear();
                                }
                            }
                        }

                    }
                }
                inFile.Close();
            }
            return errorMessage;
        }
        public string LoadDataToTargetTable(string tableName, MySql.Data.MySqlClient.MySqlConnection connection, ref DataTable dtTarget)
        {
            string errorMessage = "";
            try
            {
                using (MySql.Data.MySqlClient.MySqlTransaction tran = connection.BeginTransaction(System.Data.IsolationLevel.Serializable))
                {
                    using (MySql.Data.MySqlClient.MySqlCommand cmd = new MySql.Data.MySqlClient.MySqlCommand())
                    {
                        cmd.Connection = connection;
                        cmd.Transaction = tran;
                        cmd.CommandText = "SELECT * FROM MTG.Cards";
                        using (MySql.Data.MySqlClient.MySqlDataAdapter da = new MySql.Data.MySqlClient.MySqlDataAdapter(cmd))
                        {
                            da.UpdateBatchSize = 1000;
                            using (MySql.Data.MySqlClient.MySqlCommandBuilder cb = new MySql.Data.MySqlClient.MySqlCommandBuilder(da))
                            {
                                rowsCopied += da.Update(dtTarget);
                                tran.Commit();
                            }
                        }
                    }
                }
                System.Console.WriteLine($"{rowsCopied} rows copied.");
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
            }

            return errorMessage;
        }

        public string LoadCvsFileIntoMySqlTable(string csvFilePath, string tableName, string connectionString)
        {
            DataTable dtTarget = new DataTable("target");  // target is the data to be loaded into the MySql table.
            string errorMessage = "";
            System.Console.WriteLine($"Connecting to mySql...");
            try
            {
                using (MySql.Data.MySqlClient.MySqlConnection connection = new MySql.Data.MySqlClient.MySqlConnection(connectionString))
                {
                    connection.Open();

                    if (connection.State == ConnectionState.Open)
                    {
                        errorMessage = GetTargetTableStructure(tableName, connection, ref dtTarget);
                        if (errorMessage == "")
                        {
                            System.Console.WriteLine($"Table '{tableName}' has  {dtTarget.Columns.Count} columns");
                        }
                        if (errorMessage == "")
                        {
                            errorMessage = ReadCsvFile(csvFilePath, ref dtTarget, tableName, connection);
                            System.Console.WriteLine($"Data file '{csvFilePath}' loaded with: {dtTarget.Rows.Count} rows {dtTarget.Columns.Count} columns.");
                        }
                        if (errorMessage == "")
                        {
                            errorMessage = LoadDataToTargetTable(tableName, connection, ref dtTarget);
                        }
                        connection.Close();
                        connection.Dispose();
                    }
                    else
                    {
                        errorMessage = $"ERROR: Connection state is '{connection.State.ToString()}'";
                    }
                }
            }
            catch (System.Exception e)
            {
                errorMessage = e.Message;
            }
            return errorMessage;
        }
        static void Main(string[] args)
        {
            MtgImport p = new MtgImport();
            string errorMessage = p.LoadCvsFileIntoMySqlTable(@"U:\TFS\SoftwareMotifsProjects\MtgImport\Cards.csv", "mtg.Cards", "Persist Security Info=False;database=mtg;server=localhost;user id=mtgAdmin;Password=Godzilla2020!;");

            if (errorMessage == "")
            {
                errorMessage = "Successful Completion.";
            }
            System.Console.WriteLine(errorMessage);
            
            System.Console.WriteLine($"Done");
        }
    }
}