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

        // GET api/values
        [HttpGet] 
        public List<Item> Get()
        {
            return Context.GetAllItems();
        }

        // POST api/values
        [HttpPost]
        public IActionResult AddItem([FromBody] Item item)
        {
            Context.AddItem((Item)item);
            return Ok();
        }

        // PUT api/values/5
        [HttpPut]
        public IActionResult Put([FromBody] Item item)
        {
            Context.UpdateItem(item);
            return Ok();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult DeleteItem(string id)
        {
            Context.DeleteItem(id);
            return Ok();
        }
    }
}
