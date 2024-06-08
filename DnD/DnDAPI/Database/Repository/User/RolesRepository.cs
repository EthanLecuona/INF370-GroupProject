using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database.Repository.User
{
 
  
    public class RolesRepository : IRolesRepos
    {
      private readonly AppDbContext _appDbContext;

      public RolesRepository(AppDbContext appDbContext)
      {
        _appDbContext = appDbContext;
      }
      public void Add<T>(T entity) where T : class
      {
        _appDbContext.Add(entity);
      }
      public void Delete<T>(T entity) where T : class
      {
        _appDbContext.Remove(entity);
      }
    }
}
