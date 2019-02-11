using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace RatedLists.Backend.Models
{
    public class Person
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public List<string> ListIds { get; set; } 
    }
}
