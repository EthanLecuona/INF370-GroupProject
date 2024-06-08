using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
    public interface IuserRepository
    {
      Task<Settings> GetSettingByIdAsync(int id);
      Task<bool> SaveChangesAsync();
  }
}
