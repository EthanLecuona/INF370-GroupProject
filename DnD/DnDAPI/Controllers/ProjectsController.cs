using DnDApi.Database;
using DnDApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProjectsController : ControllerBase
  {
    private readonly IprojectRepos _projectRepos;

    public ProjectsController(IprojectRepos projectRepos)
    {
      _projectRepos = projectRepos;
    }

    // GET: api/Projects
    [HttpGet]
    [Route("getProjects")]
    public async Task<IActionResult> GetProjects()
    {
      try
      {
        var results = await _projectRepos.GetAllProjectsAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    // GET: api/Projects/5
    [HttpGet]
    [Route("getProjectName")]
    public async Task<IActionResult> GetProjectbyName(int id)
    {
      try
      {
        var result = await _projectRepos.GetProjectbyId(id);
        //if (result)
        //{
        //  return NotFound("No Match Found");
        //}

        return Ok(result);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }



    }

    // PUT: api/Projects/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    //[HttpPut("{id}")]
    //public async Task<IActionResult> PutProject(int id, Project project)
    //{
    //    if (id != project.ProjectId)
    //    {
    //        return BadRequest();
    //    }

    //    _context.Entry(project).State = EntityState.Modified;

    //    try
    //    {
    //        await _context.SaveChangesAsync();
    //    }
    //    catch (DbUpdateConcurrencyException)
    //    {
    //        if (!ProjectExists(id))
    //        {
    //            return NotFound();
    //        }
    //        else
    //        {
    //            throw;
    //        }
    //    }

    //    return NoContent();
    //}

    // POST: api/Projects
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    [Route("createProject")]
    public async Task<IActionResult> PostProject(ProjectView project)
    {
      var existingProject = await _projectRepos.GetProjectbyName(project.ProjectName);
      if (existingProject == null)
      {
        var addProject = new Project
        {
          ProjectName = project.ProjectName,
          Description = project.Description,
          CompanyId = project.CompanyId
        };
        try
        {
          _projectRepos.Add(addProject);
          await _projectRepos.SaveChangesAsync();
        }
        catch (Exception)
        {
          return BadRequest("OOPS");
        }
      }
      else
      {
        return StatusCode(StatusCodes.Status403Forbidden);
      }

      return Ok("Yes");

    }


    //DELETE: api/Projects/5
    [HttpDelete]
    [Route("deleteProject")]
    public async Task<IActionResult> DeleteProject(int id)
    {
      try
      {
        var existingProject = await _projectRepos.GetProjectbyId(id);

        if (existingProject == null) return NotFound();

        _projectRepos.Delete(existingProject);

        if (await _projectRepos.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Cannot execute request.");
      }

      return BadRequest();
    }
  }

  
}
