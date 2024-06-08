using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Suburb")]
    public partial class Suburb
    {
        public Suburb()
        {
            Streets = new HashSet<Street>();
        }

        [Key]
        [Column("Suburb_ID")]
        public int SuburbId { get; set; }
        [Column("City_ID")]
        public int CityId { get; set; }
        [Column("Suburb")]
        [StringLength(50)]
        [Unicode(false)]
        public string Suburb1 { get; set; }

        [ForeignKey("CityId")]
        [InverseProperty("Suburbs")]
        public virtual City City { get; set; } 
        [InverseProperty("Suburb")]
        public virtual ICollection<Street> Streets { get; set; }
    }
}
