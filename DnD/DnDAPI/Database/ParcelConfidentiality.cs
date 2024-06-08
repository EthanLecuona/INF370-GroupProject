using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Parcel_Confidentiality")]
    public partial class ParcelConfidentiality
    {
        public ParcelConfidentiality()
        {
            Parcels = new HashSet<Parcel>();
        }

        [Key]
        [Column("ParcelCon_ID")]
        public int ParcelConId { get; set; }
        [StringLength(20)]
        [Unicode(false)]
        public string Confidentiality { get; set; }

        [InverseProperty("ParcelCon")]
        public virtual ICollection<Parcel> Parcels { get; set; }
    }
}
