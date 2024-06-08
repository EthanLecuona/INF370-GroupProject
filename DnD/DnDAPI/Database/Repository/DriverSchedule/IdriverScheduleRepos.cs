using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IdriverScheduleRepos
  {


    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;

    Task<bool> SaveChangesAsync();
    public DateTimeDriverVehicle GetID();
    Task<DateTimeDriverVehicle> GetDateTimeDriverbyID(int id);
    Task<DateTimeDriverVehicle> GetDateTimeDriverbyBookingID(int bookingid);
    Task<DateTimeDriverVehicle[]> GetAllDateTimeDriverAsync();

    Task<DateTimeDriverVehicle[]> GetAllScheduleAsync();
  }
}
