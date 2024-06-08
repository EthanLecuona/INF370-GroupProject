using System;

namespace DnDApi.ViewModels
{
  public class TransportView
  {
    public DateTime Date { get; set; }
    public string Time { get; set; }
    public string SenderId { get; set; }
    public float Distance { get; set; }
    public string StartLocation { get; set; }
    public string EndLocation { get; set; }
  }
}
