using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("License_Code")]
    public partial class LicenseCode
    {
        public LicenseCode()
        {
            Licenses = new HashSet<License>();
        }

        [Key]
        [Column("LicenseCode_ID")]
        public int LicenseCodeId { get; set; }
        [Column("LicenseCode")]
        [StringLength(50)]
        [Unicode(false)]
        public string LicenseCode1 { get; set; } 

        [InverseProperty("LicenseCode")]
        public virtual ICollection<License> Licenses { get; set; }
    }
}
