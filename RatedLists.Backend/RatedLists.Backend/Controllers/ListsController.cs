using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RatedLists.Backend.Models;

namespace RatedLists.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        public readonly RatedListsContext Context = new RatedListsContext();

        [HttpGet]
        public List<ListOfItems> Get()
        {
            return Context.GetAllLists();
        }

        [HttpGet("{name}")]
        public void AddList(string name)
        {
            Context.AddList(name);
        }


        [HttpPut]
        public IActionResult Put([FromBody] ListOfItems list)
        {
            Context.UpdateList(list);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteList(string id)
        {
            Context.DeleteList(id);
            return Ok();
        }
    }
}