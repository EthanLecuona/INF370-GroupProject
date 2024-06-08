using DnDApi.Database;
using System;

namespace DnDApi.ViewModels
{
  public class MaintenanceView
  {
    //public double? RecordedKm { get; set; }
    public DateTime? Date { get; set; }
    public int RegistrationId { get; set; }
    public int MechanicId { get; set; }

    public bool Confirmed { get; set; }
  }
}
