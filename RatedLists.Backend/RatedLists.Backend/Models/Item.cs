using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RatedLists.Backend.Models
{
    public class Item
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string ListId { get; set; } 

        public string Name { get; set; }

        public string Picture { get; set; }

        public int Grade { get; set; }
    }
}
