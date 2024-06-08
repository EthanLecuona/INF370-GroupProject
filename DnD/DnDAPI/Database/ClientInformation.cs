using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DnDApi.Database
{
  [Table("Client_Information")]
  public partial class ClientInformation
  {
    [Key]
    [Column("ClientUser_ID")]
    [Unicode(false)]
    public string ClientUserId { get; set; }
    [Column("Title_ID")]
    public int TitleId { get; set; }
    [Column("Company_ID")]
    public int CompanyId { get; set; }

    [ForeignKey("CompanyId")]
    public virtual Company Company { get; set; }
    [ForeignKey("TitleId")]
    public virtual Title Title { get; set; }
  }
}
