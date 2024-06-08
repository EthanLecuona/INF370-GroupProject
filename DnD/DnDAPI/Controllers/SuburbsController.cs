using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DnDApi.Database;
using DnDApi.ViewModels;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SuburbsController : ControllerBase
  {
    private readonly IsuburbRepos _suburbRepos;

    public SuburbsController(IsuburbRepos suburbRepos)
    {
      _suburbRepos = suburbRepos;
    }

    [HttpGet]
    [Route("GetSuburbById")]
    public async Task<IActionResult> GetSuburbById(int id)
    {
      try
      {
        var results = await _suburbRepos.GetSuburbbyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetLatestSuburbId")]
    public IActionResult GetLatestSuburbId()
    {
      try
      {
        var results =  _suburbRepos.GetLatestSuburbID();
        return Ok(results.SuburbId);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateSuburb")]
    public async Task<IActionResult> PutSuburb(int id, SuburbView suburb)
    {
      try
      {
        var existingSuburb = await _suburbRepos.GetSuburbbyID(id);

        if (existingSuburb == null) return NotFound("Could not find the Suburb linked to this company profile.");

        existingSuburb.Suburb1 = suburb.Suburb1;

        if (await _suburbRepos.SaveChangesAsync())
        {
          return Ok(suburb);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addSuburb")]
    public async Task<IActionResult> PostSuburb(SuburbView suburb)
    {
      var addSuburb = new Suburb
      {
        Suburb1 = suburb.Suburb1,
        CityId = suburb.CityId
      };
      try
      {
        _suburbRepos.Add(addSuburb);
        await _suburbRepos.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteSuburb")]
    public async Task<IActionResult> DeleteSuburb(int id)
    {
      try
      {
        var existingSuburb = await _suburbRepos.GetSuburbbyID(id);

        if (existingSuburb == null) return NotFound();

        _suburbRepos.Delete(existingSuburb);

        if (await _suburbRepos.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }

      return BadRequest();
    }
  }
}
