using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("License")]
    public partial class License
    {
        [Key]
        [Column("License_ID")]
        public int LicenseId { get; set; }
        [Column("LicenseCode_ID")]
        public int LicenseCodeId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Description { get; set; }
        [Column("License_Number")]
        public string LicenseNumber { get; set; }
        [Column("Expiration_Date", TypeName = "date")]
        public DateTime? ExpirationDate { get; set; }

        [ForeignKey("LicenseCodeId")]
        [InverseProperty("Licenses")]
        public virtual LicenseCode LicenseCode { get; set; } 
    }
}
