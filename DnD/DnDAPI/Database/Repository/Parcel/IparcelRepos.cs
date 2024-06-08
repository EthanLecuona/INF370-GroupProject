using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IparcelRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<Parcel> GetParcelbyID(int id);
    Task<Parcel> GetParcelbyBookingID(int id);
    Task<Parcel[]> GetAllParcelsAsync();
    public Parcel GetLatestAddedID();
    Task<bool> SaveChangesAsync();
  }
}
