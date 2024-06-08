using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DnDApi.Database;
using DnDApi.ViewModels;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ClientEmployeeController : ControllerBase
  {
    private readonly IclientEmployeeConnection _employeeConnection;

    public ClientEmployeeController(AppDbContext appDb, IclientInformationRepos clientInformationRepos, IclientEmployeeConnection employeeConnection)
    {
      _employeeConnection = employeeConnection;
    }

    [HttpGet]
    [Route("GetAllClientEmployees")]
    public async Task<IActionResult> GetAllClientEmployeesAsync()
    {
      try
      {
        var results = await _employeeConnection.GetAllClientEmployeeAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetClientEmployeeById")]
    public async Task<IActionResult> GetClientEmployeeById(int id)
    {
      try
      {
        var results = await _employeeConnection.GetClientEmployeebyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPost]
    [Route("addClientEmployee")]
    public async Task<IActionResult> PostClientEmployee(ClientEmployeeView client)
    {
      var addClientEmployee = new ClientEmployeeConnection
      {
        ClientUserId = client.ClientUser_ID,
        UserId = client.User_ID
      };
      try
      {
        _employeeConnection.Add(addClientEmployee);
        await _employeeConnection.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }
  }
}
