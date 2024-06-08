using System;

namespace DnDApi.ViewModels
{
  public class EventView
  {
    public string Description { get; set; }
    public int NumberOfEmployees { get; set; }
    public string Location { get; set; }
    public DateTime EventDate { get; set; }
  }
}
