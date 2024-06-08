using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Parcel_Type")]
    public partial class ParcelType
    {
        public ParcelType()
        {
            Parcels = new HashSet<Parcel>();
        }

        [Key]
        [Column("ParcelType_ID")]
        public int ParcelTypeId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Description { get; set; }

        [InverseProperty("ParcelType")]
        public virtual ICollection<Parcel> Parcels { get; set; }
    }
}
