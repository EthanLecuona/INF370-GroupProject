using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Address")]
    public partial class Address
    {
        public Address()
        {
            Companies = new HashSet<Company>();
        }

        [Key]
        [Column("Address_ID")]
        public int AddressId { get; set; }
        [Column("Street_ID")]
        public int StreetId { get; set; }
        [Column("Postal_Code")]
        public int PostalCode { get; set; }

        [ForeignKey("StreetId")]
        [InverseProperty("Addresses")]
        public virtual Street Street { get; set; } 
        [InverseProperty("Address")]
        public virtual ICollection<Company> Companies { get; set; }
    }
}
