using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DnDApi.Database;
using DnDApi.ViewModels;
using System.Threading.Tasks;
using System;

namespace DnDApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TitlesController : ControllerBase
    {
    private readonly ItitleRepos _titleRepos;

    public TitlesController(ItitleRepos titleRepos)
    {
      _titleRepos = titleRepos;
    }

    [HttpGet]
    [Route("getTitle")]
    public async Task<IActionResult> GetParcel(int id)
    {
      try
      {
        var results = await _titleRepos.GetTitlebyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllTitles")]
    public async Task<IActionResult> GetAllTitlesAsync()
    {
      try
      {
        var results = await _titleRepos.GetAllTitlesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateTitle")]
    public async Task<IActionResult> PutTitle(int id, TitleView title)
    {
      try
      {
        var existingTitle = await _titleRepos.GetTitlebyID(id);

        if (existingTitle == null) return NotFound("Could not find the Title");

        existingTitle.Title1 = title.Title1;

        if (await _titleRepos.SaveChangesAsync())
        {
          return Ok(title);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addTitle")]
    public async Task<IActionResult> PostTitle(TitleView title)
    {
      var addTitle = new Title
      {
        Title1 = title.Title1
      };
      try
      {
        _titleRepos.Add(addTitle);
        await _titleRepos.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteTitle")]
    public async Task<IActionResult> DeleteTitle(int id)
    {

      try
      {
        var existingTitle = await _titleRepos.GetTitlebyID(id);

        if (existingTitle == null) return NotFound("Could not find the Title");

        _titleRepos.Delete(existingTitle);

        if (await _titleRepos.SaveChangesAsync())
        {
          return Ok(existingTitle);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }
  }
}
