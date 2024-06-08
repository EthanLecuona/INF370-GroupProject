using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DnDApi.Database
{
  [Table("Driver_Information")]
  public partial class DriverInformation
  {
    [Key]
    [Column("DriverUser_ID")]
    [Unicode(false)]
    public string DriverUserId { get; set; }
    [Column("DriverRating_ID")]
    public int DriverRatingId { get; set; }
    [Column("License_ID")]
    public int LicenseId { get; set; }
    [Column("Registration_ID")]
    public int RegistrationId { get; set; }

    [ForeignKey("DriverRatingId")]
    public virtual DriverRating DriverRating { get; set; }
    [ForeignKey("LicenseId")]
    public virtual License License { get; set; }
    [ForeignKey("RegistrationId")]
    public virtual Vehicle Registration { get; set; }
  }
}
