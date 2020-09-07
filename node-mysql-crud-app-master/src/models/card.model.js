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
// TABLE:       mtg.Cards
// PROCEDURE:   Find By UUID
// PURPOSE:     To get the information about a card by UUID
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// GET :    http://localhost:5000/api/v1/cards/d8fc1dd2-020a-5e02-acb5-5a4b70583a78
// (no body)
//
// RESPONSE:
// [
//     {
//         "card_id": 36588,
//         "uuid": "d8fc1dd2-020a-5e02-acb5-5a4b70583a78",
//         "index": 36587,
//         "id": 36588,
//         "artist": "Christopher Rush",
//         "asciiname": "",
//         "availability": "paper",
//         "borderColor": "black",
//         "cardKingdomFoilId": "",
//         "cardKingdomId": "",
//         "colorIdentity": "B,G,R,U,W",
//         "colorIndicator": "",
//         "colors": "B,G,R,U,W",
//         "convertedManaCost": "5",
//         "duelDeck": "",
//         "edhrecRank": "",
//         "faceConvertedManaCost": "",
//         "faceName": "",
//         "flavorName": "",
//         "flavorText": "It takes great sacrifice to make it to the top.",
//         "frameEffects": "",
//         "frameVersion": "1993",
//         "hand": "",
//         "hasAlternativeDeckLimit": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "hasContentWarning": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "hasFoil": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "hasNonFoil": {
//             "type": "Buffer",
//             "data": [
//                 1
//             ]
//         },
//         "isAlternative": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isFullArt": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isOnlineOnly": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isOversized": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isPromo": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isReprint": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isReserved": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isStarter": {
//             "type": "Buffer",
//             "data": [
//                 1
//             ]
//         },
//         "isStorySpotlight": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isTextless": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isTimeshifted": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "keywords": "",
//         "layout": "normal",
//         "leadershipSkills": "",
//         "life": "",
//         "loyalty": "",
//         "manaCost": "{W}{U}{B}{R}{G}",
//         "mcmId": "",
//         "mcmMetaId": "",
//         "mtgArenaId": "",
//         "mtgjsonV4Id": "6b0e48c0-441d-5a62-a558-3c99473e4387",
//         "mtgoFoilId": "",
//         "mtgoId": "",
//         "multiverseId": "",
//         "name": "1996 World Champion",
//         "number": "1",
//         "originalText": "",
//         "originalType": "",
//         "otherFaceIds": "",
//         "power": "",
//         "printings": "PCEL",
//         "promoTypes": "event",
//         "purchaseUrls": "{'tcgplayer': 'https://mtgjson.com/links/d8c090aa0b7765d6'}",
//         "rarity": "rare",
//         "scryfallId": "d3f10f07-7cfe-4a6f-8de6-373e367a731b",
//         "scryfallIllustrationId": "f12f705b-c031-4eee-814c-089570bf7791",
//         "scryfallOracleId": "39302443-4614-4e62-832a-b74eb2136bc7",
//         "setCode": "PCEL",
//         "side": "",
//         "subtypes": "Legend",
//         "supertypes": "",
//         "tcgplayerProductId": "21655",
//         "text": "Cannot be the target of spells or effects. World Champion has power and toughness equal to the life total of target opponent.\n{0}: Discard your hand to search your library for 1996 World Champion and reveal it to all players. Shuffle your library and put 1996 World Champion on top of it. Use this ability only at the beginning of your upkeep, and only if 1996 World Champion is in your library.",
//         "toughness": "",
//         "type": "Summon — Legend",
//         "types": "Summon",
//         "variations": "",
//         "watermark": null
//     }
// ]
//
// ------------------------------------------------------------------------------



Card.findByUuid = function (id, result) {
    let sql = "SELECT card_id,`uuid`,`index`,id,artist,asciiname,availability,borderColor,cardKingdomFoilId,cardKingdomId,colorIdentity,colorIndicator,colors,convertedManaCost,duelDeck,edhrecRank,faceConvertedManaCost,faceName,flavorName,flavorText,frameEffects,frameVersion,hand,hasAlternativeDeckLimit,hasContentWarning,hasFoil,hasNonFoil,isAlternative,isFullArt,isOnlineOnly,isOversized,isPromo,isReprint,isReserved,isStarter,isStorySpotlight,isTextless,isTimeshifted,keywords,layout,leadershipSkills,life,loyalty,manaCost,mcmId,mcmMetaId,mtgArenaId,mtgjsonV4Id,mtgoFoilId,mtgoId,multiverseId,name,number,originalText,originalType,otherFaceIds,power,printings,promoTypes,purchaseUrls,rarity,scryfallId,scryfallIllustrationId,scryfallOracleId,setCode,side,subtypes,supertypes,tcgplayerProductId,text,toughness,type,types,variations,watermark FROM mtg.Cards WHERE `uuid` = ? ";
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
// TABLE:       mtg.Cards
// PROCEDURE:   Find By Name
// PURPOSE:     To get a list of all cards
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// GET :    http://localhost:5000/api/v1/cards/ByName
// {}
//
// RESPONSE (first 2 rows only):
//

// Card.findByName = function (card, result) {
//     let sql = "SELECT card_id,`uuid`,`index`,id,artist,asciiname,availability,borderColor,cardKingdomFoilId,cardKingdomId,colorIdentity,colorIndicator,colors,convertedManaCost,duelDeck,edhrecRank,faceConvertedManaCost,faceName,flavorName,flavorText,frameEffects,frameVersion,hand,hasAlternativeDeckLimit,hasContentWarning,hasFoil,hasNonFoil,isAlternative,isFullArt,isOnlineOnly,isOversized,isPromo,isReprint,isReserved,isStarter,isStorySpotlight,isTextless,isTimeshifted,keywords,layout,leadershipSkills,life,loyalty,manaCost,mcmId,mcmMetaId,mtgArenaId,mtgjsonV4Id,mtgoFoilId,mtgoId,multiverseId,name,number,originalText,originalType,otherFaceIds,power,printings,promoTypes,purchaseUrls,rarity,scryfallId,scryfallIllustrationId,scryfallOracleId,setCode,side,subtypes,supertypes,tcgplayerProductId,text,toughness,type,types,variations,watermark FROM mtg.Cards WHERE name = ? ";
//     console.log("sql:  '", sql, "'");
//     console.log("name: '", card.name, "'");

//     dbConn.query(sql, card.name, function (error, res) {             
//         if(error) {
//             console.log("error: ", error);
//             result(error, null);
//         }
//         else{
//             result(null, res);
//         }
//     });   
// };

// ----------------------------------------------------------------------------
// TABLE:       mtg.Cards
// PROCEDURE:   Find All
// PURPOSE:     To get a list of all cards
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// GET :    http://localhost:5000/api/v1/cards
// (no body)
//
// RESPONSE (first 2 rows only):
//
// [
//     {
//         "card_id": 50197,
//         "uuid": "26ff1d87-2638-5eff-90d6-3a7f46c64104",
//         "index": 50196,
//         "id": 50197,
//         "artist": "Ron Spears",
//         "asciiname": "",
//         "availability": "paper",
//         "borderColor": "silver",
//         "cardKingdomFoilId": "112489",
//         "cardKingdomId": "112349",
//         "colorIdentity": "U",
//         "colorIndicator": "",
//         "colors": "U",
//         "convertedManaCost": "2",
//         "duelDeck": "",
//         "edhrecRank": "",
//         "faceConvertedManaCost": "",
//         "faceName": "",
//         "flavorName": "",
//         "flavorText": "{1}: This card's flavor text becomes the flavor text of your choice. (This ability doesn't work because it's flavor text, not rules text (but neither does this reminder text, so you figure it out).)",
//         "frameEffects": "",
//         "frameVersion": "2003",
//         "hand": "",
//         "hasAlternativeDeckLimit": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "hasContentWarning": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "hasFoil": {
//             "type": "Buffer",
//             "data": [
//                 1
//             ]
//         },
//         "hasNonFoil": {
//             "type": "Buffer",
//             "data": [
//                 1
//             ]
//         },
//         "isAlternative": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isFullArt": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isOnlineOnly": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isOversized": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isPromo": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isReprint": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isReserved": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isStarter": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isStorySpotlight": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isTextless": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isTimeshifted": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "keywords": "",
//         "layout": "normal",
//         "leadershipSkills": "",
//         "life": "",
//         "loyalty": "",
//         "manaCost": "{1}{U}",
//         "mcmId": "14786",
//         "mcmMetaId": "8889",
//         "mtgArenaId": "",
//         "mtgjsonV4Id": "71dbd495-fc0f-5539-8373-5e0bc02977f6",
//         "mtgoFoilId": "",
//         "mtgoId": "",
//         "multiverseId": "74252",
//         "name": "_____",
//         "number": "23",
//         "originalText": "{1}: This card's name becomes the name of your choice. Play this ability anywhere, anytime.",
//         "originalType": "Creature - Shapeshifter",
//         "otherFaceIds": "",
//         "power": "1",
//         "printings": "UNH",
//         "promoTypes": "",
//         "purchaseUrls": "{'cardKingdom': 'https://mtgjson.com/links/9950b70aeb3ef952', 'cardKingdomFoil': 'https://mtgjson.com/links/8bf3c4c283ce7461', 'cardmarket': 'https://mtgjson.com/links/d1c92cac16ec179a', 'tcgplayer': 'https://mtgjson.com/links/e671050f896ee465'}",
//         "rarity": "uncommon",
//         "scryfallId": "5aa90ab6-2686-4462-8725-5d4370c05437",
//         "scryfallIllustrationId": "5fc75011-f171-44a2-a793-a2800ae07f96",
//         "scryfallOracleId": "4e536142-4ebe-4062-887b-5dd123c41d39",
//         "setCode": "UNH",
//         "side": "",
//         "subtypes": "Shapeshifter",
//         "supertypes": "",
//         "tcgplayerProductId": "37817",
//         "text": "{1}: This card's name becomes the card name of your choice. Activate this ability anywhere, anytime.",
//         "toughness": "1",
//         "type": "Creature — Shapeshifter",
//         "types": "Creature",
//         "variations": "",
//         "watermark": null
//     },
//     {
//         "card_id": 50025,
//         "uuid": "6869d699-5f2b-5a41-886c-4e74b52ca763",
//         "index": 50024,
//         "id": 50025,
//         "artist": "Quinton Hoover",
//         "asciiname": "",
//         "availability": "paper",
//         "borderColor": "silver",
//         "cardKingdomFoilId": "112488",
//         "cardKingdomId": "112348",
//         "colorIdentity": "G,R",
//         "colorIndicator": "",
//         "colors": "G,R",
//         "convertedManaCost": "6",
//         "duelDeck": "",
//         "edhrecRank": "",
//         "faceConvertedManaCost": "",
//         "faceName": "",
//         "flavorName": "",
//         "flavorText": "",
//         "frameEffects": "",
//         "frameVersion": "2003",
//         "hand": "",
//         "hasAlternativeDeckLimit": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "hasContentWarning": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "hasFoil": {
//             "type": "Buffer",
//             "data": [
//                 1
//             ]
//         },
//         "hasNonFoil": {
//             "type": "Buffer",
//             "data": [
//                 1
//             ]
//         },
//         "isAlternative": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isFullArt": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isOnlineOnly": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isOversized": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isPromo": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isReprint": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isReserved": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isStarter": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isStorySpotlight": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isTextless": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "isTimeshifted": {
//             "type": "Buffer",
//             "data": [
//                 0
//             ]
//         },
//         "keywords": "",
//         "layout": "normal",
//         "leadershipSkills": "",
//         "life": "",
//         "loyalty": "",
//         "manaCost": "{2}{R}{R}{G}{G}",
//         "mcmId": "14879",
//         "mcmMetaId": "8868",
//         "mtgArenaId": "",
//         "mtgjsonV4Id": "8f9a35d5-a3a2-556b-88da-6686da3aaa34",
//         "mtgoFoilId": "",
//         "mtgoId": "",
//         "multiverseId": "73935",
//         "name": "\"Ach! Hans, Run!\"",
//         "number": "116",
//         "originalText": "At the beginning of your upkeep, you may say \"Ach Hans, run It's the . . .\" and name a creature card. If you do, search your library for the named card, put it into play, then shuffle your library. That creature has haste. Remove it from the game at end of turn.",
//         "originalType": "Enchantment",
//         "otherFaceIds": "",
//         "power": "",
//         "printings": "UNH",
//         "promoTypes": "",
//         "purchaseUrls": "{'cardKingdom': 'https://mtgjson.com/links/84dfefe718a51cf8', 'cardKingdomFoil': 'https://mtgjson.com/links/d8c9f3fc1e93c89c', 'cardmarket': 'https://mtgjson.com/links/b9d69f0d1a9fb80c', 'tcgplayer': 'https://mtgjson.com/links/c51d2b13ff76f1f0'}",
//         "rarity": "rare",
//         "scryfallId": "84f2c8f5-8e11-4639-b7de-00e4a2cbabee",
//         "scryfallIllustrationId": "be49af2a-e561-49d6-b21f-4f3bf451f11b",
//         "scryfallOracleId": "a2c5ee76-6084-413c-bb70-45490d818374",
//         "setCode": "UNH",
//         "side": "",
//         "subtypes": "",
//         "supertypes": "",
//         "tcgplayerProductId": "37816",
//         "text": "At the beginning of your upkeep, you may say \"Ach! Hans, run! It's the . . .\" and the name of a creature card. If you do, search your library for a card with that name, put it onto the battlefield, then shuffle your library. That creature gains haste. Exile it at the beginning of the next end step.",
//         "toughness": "",
//         "type": "Enchantment",
//         "types": "Enchantment",
//         "variations": "",
//         "watermark": null
//     }
// ]
// ------------------------------------------------------------------------------


Card.findAll = function (result) {
    let sql = "SELECT card_id,`uuid`,`index`,id,artist,asciiname,availability,borderColor,cardKingdomFoilId,cardKingdomId,colorIdentity,colorIndicator,colors,convertedManaCost,duelDeck,edhrecRank,faceConvertedManaCost,faceName,flavorName,flavorText,frameEffects,frameVersion,hand,hasAlternativeDeckLimit,hasContentWarning,hasFoil,hasNonFoil,isAlternative,isFullArt,isOnlineOnly,isOversized,isPromo,isReprint,isReserved,isStarter,isStorySpotlight,isTextless,isTimeshifted,keywords,layout,leadershipSkills,life,loyalty,manaCost,mcmId,mcmMetaId,mtgArenaId,mtgjsonV4Id,mtgoFoilId,mtgoId,multiverseId,name,number,originalText,originalType,otherFaceIds,power,printings,promoTypes,purchaseUrls,rarity,scryfallId,scryfallIllustrationId,scryfallOracleId,setCode,side,subtypes,supertypes,tcgplayerProductId,text,toughness,type,types,variations,watermark FROM mtg.Cards ORDER BY Name";
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
