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
  public class ClientInformationController : ControllerBase
  {
    private readonly AppDbContext _appDb;
    private readonly IclientInformationRepos _clientInformationRepos;

    public ClientInformationController(AppDbContext appDb, IclientInformationRepos clientInformationRepos)
    {
      _appDb = appDb;
      _clientInformationRepos = clientInformationRepos;
    }

    [HttpGet]
    [Route("getClientInformation")]
    public async Task<IEnumerable<object>> getClientInformation(string userID)
    {
      return await _appDb.ClientInformation.Select(c => new { c.ClientUserId,
        ClienttoCompany = _appDb.Company.Select(e => new {e.CompanyId, e.CompanyName}).Where(x => x.CompanyId == c.CompanyId).ToList(),
        ClienttoTitle = _appDb.Title.Select(e => new {e.TitleId, e.Title1}).Where(x => x.TitleId == c.TitleId).ToList()
      }).ToListAsync();
    }

    [HttpGet]
    [Route("getClientCompany")]
    public async Task<ActionResult<object>> getClientCompany(string ClientID)
    {
      return await _appDb.ClientInformation.Where(c => c.ClientUserId == ClientID).ToListAsync();
    }

    [HttpGet]
    [Route("getClientNameCompanyName")]
    public object getClientNameCompanyName(string empId)
    {
      var query = (from ClientInformation in _appDb.ClientInformation
                   join Company in _appDb.Company
                   on ClientInformation.CompanyId equals Company.CompanyId
                   join Asp in _appDb.Users
                   on ClientInformation.ClientUserId equals Asp.Id
                   join CEC in _appDb.ClientEmployeeConnection
                   on ClientInformation.ClientUserId equals CEC.ClientUserId
                   select new
                   {
                     userId = Asp.Id,
                     companyId = Company.CompanyId,
                     companyName = Company.CompanyName,
                     username = Asp.Firstname + " " + Asp.Lastname,
                     empId = CEC.UserId
                   }).Where(c => c.empId == empId).ToList();
      return query;
    }

    [HttpPost]
    [Route("addClientInformation")]
    public async Task<IActionResult> PostClientInformation(ClientInformationView client)
    {
      var addClientInformation = new ClientInformation
      {
        ClientUserId = client.clientUser_ID,
        TitleId = client.title_ID,
        CompanyId = client.company_ID
      };
      //try
      //{
        _clientInformationRepos.Add(addClientInformation);
        await _clientInformationRepos.SaveChangesAsync();
        return Ok();
      }
      //catch (Exception)
      //{
      //  return BadRequest("OOPS");
      //}
    //}
  }
}
