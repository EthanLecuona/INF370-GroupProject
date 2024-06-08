using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DnDApi.Database;
using DnDApi.ViewModels;
//using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace DnDApi.Database
{
  public class userRepository : IuserRepository
  {
    private readonly AppDbContext _appDbContext;
    private readonly UserManager<AppUser> _userManager;
    private readonly IUserClaimsPrincipalFactory<AppUser> _claimsPrincipalFactory;
    private readonly IConfiguration _configuration;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public userRepository(AppDbContext appDbContext,
      UserManager<AppUser> userManager,
      IUserClaimsPrincipalFactory<AppUser> claimsPrincipalFactory,
      IConfiguration configuration,
      IHttpContextAccessor httpContextAccessor)
    {
      _appDbContext = appDbContext;
      _userManager = userManager;
      _claimsPrincipalFactory = claimsPrincipalFactory;
      _configuration = configuration;
      _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Settings> GetSettingByIdAsync(int Id)
    {
      IQueryable<Settings> query = _appDbContext.Settings.Where(s => s.SettingsId == Id);
      return await query.FirstOrDefaultAsync();
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
