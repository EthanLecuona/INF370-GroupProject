using System;

namespace DnDApi.ViewModels
{
  public class IncidentView
  {
    public string Location { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public int IncidentStatus_ID { get; set; }
    public string DriverUser_ID { get; set; }
    public string ResolveMethod { get; set; }
  }
}
