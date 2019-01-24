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
            string connectionString = "mongodb://localhost:1111/RatedLists";
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

        public List<Comparison> GetAllComparisons()
        {
            return database
                .GetCollection<Comparison>("Comparisons")
                .AsQueryable<Comparison>()
                .ToList();
        }

        public void AddItem(Item item)
        {
            database.GetCollection<Item>("Items").InsertOne(item);
        }

        public void DeleteItem(string id)
        {
            database.GetCollection<Item>("Items").DeleteOne(x => x.Id == id);
        }

        public void UpdateItem(Item item)
        {
            database.GetCollection<Item>("Items").FindOneAndReplace(x => x.Id == item.Id, item);
        }

        public void AddComparison(Comparison сomparison)
        {
            database.GetCollection<Comparison>("Comparisons").InsertOne(сomparison);
        }

        public void UpdateComparison(Comparison сomparison)
        {
            database.GetCollection<Comparison>("Comparisons").FindOneAndReplace(x => x.Id == сomparison.Id, сomparison);
        }

        public void DeleteComparison(string id)
        {
            database.GetCollection<Comparison>("Comparisons").DeleteOne(x => x.Id == id);
        }

        public string GetItemName(string id)
        {
            // return database.GetCollection<Item>("Items").Find(x => x.Id == id).FirstOrDefault().Name;
            return "dfkgjhsdlkjf";
        }
    }
}
