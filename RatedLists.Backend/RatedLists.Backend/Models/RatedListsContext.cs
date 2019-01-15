using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace RatedLists.Backend.Models
{
    public class RatedListsContext
    {
        private readonly IMongoDatabase database; // база данных

        IGridFSBucket gridFS;   // файловое хранилище

        public RatedListsContext()
        {
            // строка подключения
            string connectionString = "mongodb://localhost:27017/RatedLists";
            var connection = new MongoUrlBuilder(connectionString);
            // получаем клиента для взаимодействия с базой данных
            MongoClient client = new MongoClient(connectionString);
            // получаем доступ к самой базе данных
            database = client.GetDatabase(connection.DatabaseName);
            // получаем доступ к файловому хранилищу
            gridFS = new GridFSBucket(database);
        }

        public List<Item> GetAllItems()
        {
            return database
                .GetCollection<Item>("Items")
                .AsQueryable<Item>()
                .ToList();
        }

        public IMongoCollection<ListOfItems> GetAllListOfItems => database.GetCollection<ListOfItems>("ListsOfItems");

        public IMongoCollection<User> GetAllUsers => database.GetCollection<User>("Users");

        public IMongoCollection<Comparison> GetAllComparisons => database.GetCollection<Comparison>("Comparisons");

        public string AddItem(Item item)
        {
            database.GetCollection<Item>("Items").InsertOne(item);
            return "OK";
        }

        public void DeleteItem(string id)
        {
            database.GetCollection<Item>("Items").DeleteOne(x => x.Id == id);
        }

        public void UpdateItem(Item item)
        {
            database.GetCollection<Item>("Items").FindOneAndReplace(x => x.Id == item.Id, item);
        }
    }
}
