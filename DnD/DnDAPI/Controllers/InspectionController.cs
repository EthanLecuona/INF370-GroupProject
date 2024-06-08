using DnDApi.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using DnDApi.ViewModels;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class InspectionController : ControllerBase
  {
    private readonly IinspectionRepos _inspectionRepos;

    public InspectionController(IinspectionRepos inspectionRepos)
    {
      _inspectionRepos = inspectionRepos;
    }

    [HttpGet]
    [Route("GetInspectionByID")]
    public async Task<IActionResult> GetInspectionByID(int id)
    {
      try
      {
        var results = await _inspectionRepos.GetInspectionbyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllInspections")]
    public async Task<IActionResult> GetAllInspections()
    {
      try
      {
        var results = await _inspectionRepos.GetAllInspectionsAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPost]
    [Route("addpreInspection")]
    public async Task<IActionResult> addpreInspection(PreInspectionView preInspection)
    {
      try
      {
        var addpreInspection = new Inspection
        {
          DriverUserId = preInspection.DriverUserId,
          StartDate = preInspection.StartDate,
          PreCarInspection = preInspection.PreCarInspection,
          PreCarOdometer = preInspection.PreCarOdometer,
          PreCarTyres = preInspection.PreCarTyres,
          PreCarNotes = preInspection.PreCarNotes
        };
      
        _inspectionRepos.Add(addpreInspection);
        if(await _inspectionRepos.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }
      return Ok();
    }

    [HttpPut]
    [Route("addpostInspection")]
    public async Task<IActionResult> addpostInspection(PostInspectionView postInspection)
    {
      try
      {
        var existingInspection = await _inspectionRepos.GetInspectionbyDriverID(postInspection.DriverUserId, postInspection.EndDate);
       
        if(existingInspection == null)
        {
          return BadRequest();
        }
        existingInspection.EndDate = postInspection.EndDate;
        existingInspection.PostCarInspection = postInspection.PostCarInspection;
        existingInspection.PostCarNotes = postInspection.PostCarNotes;
        existingInspection.PostCarOdometer = postInspection.PostCarOdometer;
        existingInspection.PostCarTyres = postInspection.PostCarTyres;
        if (await _inspectionRepos.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }
      return Ok();
    }

  }
}
