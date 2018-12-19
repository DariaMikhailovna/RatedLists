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
        IMongoDatabase database; // база данных
        IGridFSBucket gridFS;   // файловое хранилище

        public RatedListsContext()
        {
            // строка подключения
            string connectionString = "mongodb://localhost:27017/RatedListsDB";
            var connection = new MongoUrlBuilder(connectionString);
            // получаем клиента для взаимодействия с базой данных
            MongoClient client = new MongoClient(connectionString);
            // получаем доступ к самой базе данных
            database = client.GetDatabase(connection.DatabaseName);
            // получаем доступ к файловому хранилищу
            gridFS = new GridFSBucket(database);
        }

        private IMongoCollection<Item> GetAllItems
        {
            get { return database.GetCollection<Item>("Items"); }
        }

        private IMongoCollection<ListOfItems> GetAllListOfItems
        {
            get { return database.GetCollection<ListOfItems>("ListsOfItems"); }
        }

        private IMongoCollection<User> GetAllUsers
        {
            get { return database.GetCollection<User>("Users"); }
        }

        private IMongoCollection<Comparison> GetAllComparisons 
        {
            get { return database.GetCollection<Comparison>("Comparisons"); }
        }
    }
}
