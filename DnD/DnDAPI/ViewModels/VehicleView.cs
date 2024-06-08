namespace DnDApi.ViewModels
{
  public class VehicleView
  {
    public string RegistrationNumber { get; set; }
    public int ManufacturerId { get; set; }
    public int ModelId { get; set; }
    public string ManufacturedDate { get; set; }
    public int VehicleClassId { get; set; }
    public bool Activated { get; set; }
  }
}
