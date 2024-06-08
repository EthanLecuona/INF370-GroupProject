using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Mechanic")]
    public partial class Mechanic
    {
        public Mechanic()
        {
            Maintenances = new HashSet<Maintenance>();
        }

        [Key]
        [Column("Mechanic_ID")]
        public int MechanicId { get; set; }
        [Column("Mechanic_Name")]
        [StringLength(50)]
        [Unicode(false)]
        public string MechanicName { get; set; }
        [Column("Mechanic_Email")]
        [StringLength(50)]
        [Unicode(false)]
        public string MechanicEmail { get; set; }

        [InverseProperty("Mechanic")]
        public virtual ICollection<Maintenance> Maintenances { get; set; }
    }
}
