using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Parcel_Priority")]
    public partial class ParcelPriority
    {
        public ParcelPriority()
        {
            Parcels = new HashSet<Parcel>();
        }

        [Key]
        [Column("ParcelPriority_ID")]
        public int ParcelPriorityId { get; set; }
        [StringLength(10)]
        [Unicode(false)]
        public string Priority { get; set; }

        [InverseProperty("ParcelPriority")]
        public virtual ICollection<Parcel> Parcels { get; set; }
    }
}
