using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;


namespace RatedLists.Backend.Models
{
    public class Comparison
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        public string Item1 { get; set; }

        public string Item2 { get; set; }

        public int ComparisonNum { get; set; }
    } 
}
