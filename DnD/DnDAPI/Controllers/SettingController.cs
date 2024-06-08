using DnDApi.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SettingController : ControllerBase
  {
    AppDbContext _appDbContext;
    private readonly IuserRepository _userRepo;
    public SettingController(AppDbContext appDbContext, IuserRepository userRepo)
    {
      _appDbContext = appDbContext;
      _userRepo = userRepo;
    }

    [HttpPut]
    [Route("UpdateLogoutTimer")]
    public async Task<IActionResult> UpdateLogoutTimer(int seconds)
    {
      try
      {
        var setting = await _userRepo.GetSettingByIdAsync(1);
        if (setting == null)
        {
          return BadRequest("Something went wrong!");
        }
        setting.LogoutTimer = seconds;
        if(await _userRepo.SaveChangesAsync())
        {
          return Ok("Successfully update Logout Timer");
        }
        else
        {
          return BadRequest("Something went terrible!");
        }
      }
      catch (Exception)
      {
        return BadRequest("Something went wrong!");
      }
    }

    [HttpGet]
    [Route("GetLogoutTimer")]
    public async Task<IActionResult> GetLogoutTimer()
    {
      try
      {
        var setting = await _userRepo.GetSettingByIdAsync(1);

        if(setting == null)
        {
          return BadRequest("something went wrong");
        }
        return Ok(setting);
      }
      catch (Exception)
      {
        return BadRequest("Something went wrong!");
      }


    }
  }
}
