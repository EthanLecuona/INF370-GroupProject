using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Street")]
    public partial class Street
    {
        public Street()
        {
            Addresses = new HashSet<Address>();
        }

        [Key]
        [Column("Street_ID")]
        public int StreetId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string StreetName { get; set; }
        [Column("Suburb_ID")]
        public int SuburbId { get; set; }
        public int StreetNumber { get; set; }

        [ForeignKey("SuburbId")]
        [InverseProperty("Streets")]
        public virtual Suburb Suburb { get; set; } 
        [InverseProperty("Street")]
        public virtual ICollection<Address> Addresses { get; set; }
    }
}
