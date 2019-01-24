using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RatedLists.Backend.Models;

namespace RatedLists.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        public readonly RatedListsContext Context = new RatedListsContext();

        [HttpGet] 
        public List<Item> Get()
        {
            return Context.GetAllItems();
        }

        [HttpPost]
        public IActionResult AddItem([FromBody] Item item)
        {
            Context.AddItem(item);
            return Ok();
        }

        [HttpPut]
        public IActionResult Put([FromBody] Item item)
        {
            Context.UpdateItem(item);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteItem(string id)
        {
            Context.DeleteItem(id);
            return Ok();
        }

        [HttpGet("{id}")]
        public string GetItemName(string id)
        {
            return Context.GetItemName(id);
        }
    }
}
