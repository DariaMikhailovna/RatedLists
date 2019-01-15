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
    public class ComparisonsController : ControllerBase
    {
        public readonly RatedListsContext Context = new RatedListsContext();

        [HttpGet]
        public List<Comparison> Get()
        {
            return Context.GetAllComparisons();
        }

        [HttpPost]
        public IActionResult AddComparison([FromBody] Comparison сomparison) 
        {
            Context.AddComparison(сomparison);
            return Ok();
        } 

        [HttpPut]
        public IActionResult Put([FromBody] Comparison сomparison)
        {
            Context.UpdateComparison(сomparison);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteComparison(string id) 
        {
            Context.DeleteComparison(id);
            return Ok();
        }
    }
}