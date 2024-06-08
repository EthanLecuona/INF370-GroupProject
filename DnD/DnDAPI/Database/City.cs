using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("City")]
    public partial class City
    {
        public City()
        {
            Suburbs = new HashSet<Suburb>();
        }

        [Key]
        [Column("City_ID")]
        public int CityId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string CityName { get; set; }

        [InverseProperty("City")]
        public virtual ICollection<Suburb> Suburbs { get; set; }
    }
}
