// FILE: ./src/models/card.model.js

'use strict';
var dbConn = require('./../../config/db.config');

//card object create
var Card = function(card){
    this.uuid   = card.uuid;
    this.name   = card.name;
};

// The mtg.Cards table contains a read-only set of data uploaded from mtgjason.com;
// therefore, no create, update, or delete capability is provided for the front end.


// Here is a list of all of the available columns in the btg.Cards table:
//
// card_id,uuid,index,id,artist,asciiname,availability,borderColor,cardKingdomFoilId,cardKingdomId,
// colorIdentity,colorIndicator,colors,convertedManaCost,duelDeck,edhrecRank,faceConvertedManaCost,
// faceName,flavorName,flavorText,frameEffects,frameVersion,hand,hasAlternativeDeckLimit,hasContentWarning,
// hasFoil,hasNonFoil,isAlternative,isFullArt,isOnlineOnly,isOversized,isPromo,isReprint,isReserved,isStarter,
// isStorySpotlight,isTextless,isTimeshifted,keywords,layout,leadershipSkills,life,loyalty,manaCost,
// mcmId,mcmMetaId,mtgArenaId,mtgjsonV4Id,mtgoFoilId,mtgoId,multiverseId,name,number,originalText,originalType,
// otherFaceIds,power,printings,promoTypes,purchaseUrls,rarity,scryfallId,scryfallIllustrationId,
// scryfallOracleId,setCode,side,subtypes,supertypes,tcgplayerProductId,text,toughness,type,types,variations,watermark`
//
// You can remove any columns you want from the select statement except for uuid and name
// The comment above is a handy reference for spelling of each column in the card table
// should you wish to reinstate a column in the result set later on.


// ----------------------------------------------------------------------------
// TABLE:       mtg.Links
// PROCEDURE:   Create
// PURPOSE:     To create a Link between two cards by a user for commentary
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// URL :    http://localhost:5000/api/v1/links
// Body:
// { 
//    "card_1" : "38513fa0-ea83-5642-8ecd-4f0b3daa6768",
//    "card_2" : "b8a68840-4044-52c0-a14e-0a1c630ba42c",
//    "score" : 23,
//    "creator_id" : 10
// }
//
// ------------------------------------------------------------------------------



Card.findById = function (id, result) {
    let sql = `SELECT card_id,uuid,index,id,artist,asciiname,availability,borderColor,cardKingdomFoilId,cardKingdomId,colorIdentity,colorIndicator,colors,convertedManaCost,duelDeck,edhrecRank,faceConvertedManaCost,faceName,flavorName,flavorText,frameEffects,frameVersion,hand,hasAlternativeDeckLimit,hasContentWarning,hasFoil,hasNonFoil,isAlternative,isFullArt,isOnlineOnly,isOversized,isPromo,isReprint,isReserved,isStarter,isStorySpotlight,isTextless,isTimeshifted,keywords,layout,leadershipSkills,life,loyalty,manaCost,mcmId,mcmMetaId,mtgArenaId,mtgjsonV4Id,mtgoFoilId,mtgoId,multiverseId,name,number,originalText,originalType,otherFaceIds,power,printings,promoTypes,purchaseUrls,rarity,scryfallId,scryfallIllustrationId,scryfallOracleId,setCode,side,subtypes,supertypes,tcgplayerProductId,text,toughness,type,types,variations,watermark FROM mtg.Cards WHERE Card_ID = ? ORDER BY Name `;
    console.log("sql: ", sql);
    dbConn.query(sql, id, function (error, res) {             
        if(error) {
            console.log("error: ", error);
            result(error, null);
        }
        else{
            result(null, res);
        }
    });   
};

// ----------------------------------------------------------------------------
// TABLE:       mtg.Links
// PROCEDURE:   Create
// PURPOSE:     To create a Link between two cards by a user for commentary
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// URL :    http://localhost:5000/api/v1/links
// Body:
// { 
//    "card_1" : "38513fa0-ea83-5642-8ecd-4f0b3daa6768",
//    "card_2" : "b8a68840-4044-52c0-a14e-0a1c630ba42c",
//    "score" : 23,
//    "creator_id" : 10
// }
//
// ------------------------------------------------------------------------------


Card.findAll = function (result) {
    let sql = `SELECT card_id,uuid,index,id,artist,asciiname,availability,borderColor,cardKingdomFoilId,cardKingdomId,colorIdentity,colorIndicator,colors,convertedManaCost,duelDeck,edhrecRank,faceConvertedManaCost,faceName,flavorName,flavorText,frameEffects,frameVersion,hand,hasAlternativeDeckLimit,hasContentWarning,hasFoil,hasNonFoil,isAlternative,isFullArt,isOnlineOnly,isOversized,isPromo,isReprint,isReserved,isStarter,isStorySpotlight,isTextless,isTimeshifted,keywords,layout,leadershipSkills,life,loyalty,manaCost,mcmId,mcmMetaId,mtgArenaId,mtgjsonV4Id,mtgoFoilId,mtgoId,multiverseId,name,number,originalText,originalType,otherFaceIds,power,printings,promoTypes,purchaseUrls,rarity,scryfallId,scryfallIllustrationId,scryfallOracleId,setCode,side,subtypes,supertypes,tcgplayerProductId,text,toughness,type,types,variations,watermark FROM mtg.Cards ORDER BY Name `;
    console.log("sql: ", sql);
    dbConn.query(sql, function (error, res) {
        if(error) {
            console.log("error: ", error);
            result(error, null);
        }
        else{
            console.log('cards : ', res);  
            result(null, res);
        }
    });   
};

module.exports= Card;
