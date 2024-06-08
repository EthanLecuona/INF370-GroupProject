using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using DnDApi.ViewModels;

namespace DnDApi.Database
{
    public partial class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Address { get; set; } 
        public virtual DbSet<AuditLog> AuditLog { get; set; } 
        public virtual DbSet<AuditLogType> AuditLogType { get; set; } 
        public virtual DbSet<Booking> Booking { get; set; } 
        public virtual DbSet<BookingCancellation> BookingCancellation { get; set; } 
        public virtual DbSet<BookingStatus> BookingStatus { get; set; } 
        public virtual DbSet<BookingType> BookingType { get; set; } 
        public virtual DbSet<City> City { get; set; } 
        public virtual DbSet<ClientEmployeeConnection> ClientEmployeeConnection { get; set; } 
        public virtual DbSet<ClientInformation> ClientInformation { get; set; } 
        public virtual DbSet<Comment> Comment { get; set; } 
        public virtual DbSet<Company> Company { get; set; } 
        public virtual DbSet<Date> Date { get; set; } 
        public virtual DbSet<DateTimeDriverVehicle> DateTimeDriverVehicle { get; set; } 
        public virtual DbSet<DriverInformation> DriverInformation { get; set; }
        public virtual DbSet<DriverLocation> DriverLocation { get; set; }
        public virtual DbSet<DriverRating> DriverRating { get; set; } 
        public virtual DbSet<DriverStatus> DriverStatus { get; set; } 
        public virtual DbSet<Event> Event { get; set; } 
        public virtual DbSet<EventBooking> EventBooking { get; set; } 
        public virtual DbSet<FuelPrice> FuelPrice { get; set; } 
        public virtual DbSet<Incident> Incident { get; set; } 
        public virtual DbSet<IncidentStatus> IncidentStatus { get; set; } 
        public virtual DbSet<Inspection> Inspection { get; set; } 
        public virtual DbSet<License> License { get; set; } 
        public virtual DbSet<LicenseCode> LicenseCode { get; set; } 
        public virtual DbSet<Maintenance> Maintenance { get; set; } 
        public virtual DbSet<Mechanic> Mechanic { get; set; }
        public virtual DbSet<Parcel> Parcel { get; set; } 
        public virtual DbSet<ParcelConfidentiality> ParcelConfidentiality { get; set; } 
        public virtual DbSet<ParcelPriority> ParcelPriority { get; set; } 
        public virtual DbSet<ParcelType> ParcelType { get; set; } 
        public virtual DbSet<Project> Project { get; set; } 
        public virtual DbSet<Rating> Rating { get; set; } 
        public virtual DbSet<Settings> Settings { get; set; } 
        public virtual DbSet<Street> Street { get; set; } 
        public virtual DbSet<Suburb> Suburb { get; set; } 
        public virtual DbSet<Time> Time { get; set; } 
        public virtual DbSet<Title> Title { get; set; } 
        public virtual DbSet<Tracking> Tracking { get; set; } 
        public virtual DbSet<Vehicle> Vehicle { get; set; } 
        public virtual DbSet<VehicleClass> VehicleClass { get; set; } 
        public virtual DbSet<VehicleManufacturer> VehicleManufacturer { get; set; } 
        public virtual DbSet<VehicleModel> VehicleModel { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            //{
            //    optionsBuilder.UseSqlServer("Server=DESKTOP-H1IJK9G;Database=DnD;Trusted_Connection=True;");
            //}
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasOne(d => d.Street)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.StreetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Address__Street___787EE5A0");
            });

            modelBuilder.Entity<AuditLog>(entity =>
            {
                entity.HasKey(e => e.LogId)
                    .HasName("PK__AuditLog__2D26E7AE8379E6C4");

                entity.HasOne(d => d.AuditLogType)
                    .WithMany(p => p.AuditLogs)
                    .HasForeignKey(d => d.AuditLogTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AuditLog__AuditL__778AC167");
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.Property(e => e.Fined).HasDefaultValueSql("(CONVERT([bit],(0)))");

                entity.HasOne(d => d.BookingStatus)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.BookingStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Booking__Booking__7A672E12");

                entity.HasOne(d => d.BookingType)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.BookingTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Booking__Booking__797309D9");

                entity.HasOne(d => d.Cec)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.CecId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Booking__CEC_ID__7B5B524B");
            });

            modelBuilder.Entity<BookingCancellation>(entity =>
            {
                entity.HasKey(e => e.BookingCancelId)
                    .HasName("PK__Booking___960AD4CB9B508B59");

                entity.Property(e => e.CancelledDescription).HasDefaultValueSql("('Not Cancelled')");

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.BookingCancellations)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Booking_C__Booki__7C4F7684");
            });

            modelBuilder.Entity<ClientEmployeeConnection>(entity =>
            {
                entity.HasKey(e => e.CecId)
                    .HasName("PK__Client_E__3DFE5BD1C4C7564E");
            });

            modelBuilder.Entity<ClientInformation>(entity =>
            {
                entity.HasOne(d => d.Company)
                    .WithMany()
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Client_In__Compa__7D439ABD");

                entity.HasOne(d => d.Title)
                    .WithMany()
                    .HasForeignKey(d => d.TitleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Client_In__Title__7E37BEF6");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Comment__Booking__7F2BE32F");
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.Property(e => e.Activated).HasDefaultValueSql("(CONVERT([bit],(1)))");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Companies)
                    .HasForeignKey(d => d.AddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Company__Address__00200768");
            });

            modelBuilder.Entity<Date>(entity =>
            {
                entity.HasKey(e => e.ScheduleDateId)
                    .HasName("PK__Date__3B21CA9490B99B04");
            });

            modelBuilder.Entity<DateTimeDriverVehicle>(entity =>
            {
                entity.HasKey(e => e.DateTimeDriverId)
                    .HasName("PK__Date_Tim__D31AB91B11339966");

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.DateTimeDriverVehicles)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Date_Time__Booki__01142BA1");

                entity.HasOne(d => d.DriverStatus)
                    .WithMany(p => p.DateTimeDriverVehicles)
                    .HasForeignKey(d => d.DriverStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Date_Time__Drive__02084FDA");

                entity.HasOne(d => d.ScheduleDate)
                    .WithMany(p => p.DateTimeDriverVehicles)
                    .HasForeignKey(d => d.ScheduleDateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Date_Time__Sched__03F0984C");

                entity.HasOne(d => d.ScheduleTime)
                    .WithMany(p => p.DateTimeDriverVehicles)
                    .HasForeignKey(d => d.ScheduleTimeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Date_Time__Sched__02FC7413");
            });

            modelBuilder.Entity<DriverInformation>(entity =>
            {
                entity.HasOne(d => d.DriverRating)
                    .WithMany()
                    .HasForeignKey(d => d.DriverRatingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Driver_In__Drive__05D8E0BE");

                entity.HasOne(d => d.License)
                    .WithMany()
                    .HasForeignKey(d => d.LicenseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Driver_In__Licen__04E4BC85");

                entity.HasOne(d => d.Registration)
                    .WithMany()
                    .HasForeignKey(d => d.RegistrationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Driver_In__Regis__06CD04F7");
            });

            modelBuilder.Entity<DriverRating>(entity =>
            {
                entity.HasOne(d => d.Rating)
                    .WithMany(p => p.DriverRatings)
                    .HasForeignKey(d => d.RatingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Driver_Ra__Ratin__07C12930");
            });

            modelBuilder.Entity<EventBooking>(entity =>
            {
                entity.HasKey(e => e.EventBooking1)
                    .HasName("PK__Event_Bo__C55E437B7010C09F");

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.EventBookings)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Event_Boo__Booki__09A971A2");

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.EventBookings)
                    .HasForeignKey(d => d.EventId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Event_Boo__Event__08B54D69");
            });

            modelBuilder.Entity<Incident>(entity =>
            {
                entity.HasOne(d => d.IncidentStatus)
                    .WithMany(p => p.Incidents)
                    .HasForeignKey(d => d.IncidentStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Incident__Incide__0A9D95DB");
            });

            modelBuilder.Entity<License>(entity =>
            {
                entity.HasOne(d => d.LicenseCode)
                    .WithMany(p => p.Licenses)
                    .HasForeignKey(d => d.LicenseCodeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__License__License__0B91BA14");
            });

            modelBuilder.Entity<Maintenance>(entity =>
            {
                entity.HasOne(d => d.Mechanic)
                    .WithMany(p => p.Maintenances)
                    .HasForeignKey(d => d.MechanicId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Maintenan__Mecha__0D7A0286");

                entity.HasOne(d => d.Registration)
                    .WithMany(p => p.Maintenances)
                    .HasForeignKey(d => d.RegistrationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Maintenan__Regis__0C85DE4D");
            });

            modelBuilder.Entity<Parcel>(entity =>
            {
                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.Parcels)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Parcel__Booking___114A936A");

                entity.HasOne(d => d.ParcelCon)
                    .WithMany(p => p.Parcels)
                    .HasForeignKey(d => d.ParcelConId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Parcel__ParcelCo__0E6E26BF");

                entity.HasOne(d => d.ParcelPriority)
                    .WithMany(p => p.Parcels)
                    .HasForeignKey(d => d.ParcelPriorityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Parcel__ParcelPr__0F624AF8");

                entity.HasOne(d => d.ParcelType)
                    .WithMany(p => p.Parcels)
                    .HasForeignKey(d => d.ParcelTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Parcel__ParcelTy__10566F31");
            });

            modelBuilder.Entity<ParcelConfidentiality>(entity =>
            {
                entity.HasKey(e => e.ParcelConId)
                    .HasName("PK__Parcel_C__D749DB3F09EF375C");
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Projects)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Project__Company__123EB7A3");
            });

            modelBuilder.Entity<Settings>(entity =>
            {
                entity.HasKey(e => e.SettingsId)
                    .HasName("PK__Settings__BAEF734CC26FF472");
            });

            modelBuilder.Entity<Street>(entity =>
            {
                entity.HasOne(d => d.Suburb)
                    .WithMany(p => p.Streets)
                    .HasForeignKey(d => d.SuburbId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Street__Suburb_I__1332DBDC");
            });

            modelBuilder.Entity<Suburb>(entity =>
            {
                entity.HasOne(d => d.City)
                    .WithMany(p => p.Suburbs)
                    .HasForeignKey(d => d.CityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Suburb__City_ID__14270015");
            });

            modelBuilder.Entity<Time>(entity =>
            {
                entity.HasKey(e => e.ScheduleTimeId)
                    .HasName("PK__Time__D2C6CFADC3AAA042");
            });

            modelBuilder.Entity<Tracking>(entity =>
            {
                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.Trackings)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Tracking__Bookin__151B244E");
            });

            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.HasKey(e => e.RegistrationId)
                    .HasName("PK__Vehicle__80BC7A172F7E2E44");

                entity.Property(e => e.Activated).HasDefaultValueSql("(CONVERT([bit],(0)))");

                entity.Property(e => e.Availability).HasDefaultValueSql("(CONVERT([bit],(1)))");

                entity.HasOne(d => d.Manufacturer)
                    .WithMany(p => p.Vehicles)
                    .HasForeignKey(d => d.ManufacturerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Vehicle__Manufac__17036CC0");

                entity.HasOne(d => d.Model)
                    .WithMany(p => p.Vehicles)
                    .HasForeignKey(d => d.ModelId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Vehicle__Model_I__17F790F9");

                entity.HasOne(d => d.VehicleClass)
                    .WithMany(p => p.Vehicles)
                    .HasForeignKey(d => d.VehicleClassId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Vehicle__Vehicle__160F4887");
            });

            modelBuilder.Entity<VehicleManufacturer>(entity =>
            {
                entity.HasKey(e => e.ManufacturerId)
                    .HasName("PK__Vehicle___80009240F6E3377F");
            });

            modelBuilder.Entity<VehicleModel>(entity =>
            {
                entity.HasKey(e => e.ModelId)
                    .HasName("PK__Vehicle___1E82D1D3E95BD35A");

                entity.HasOne(d => d.Manufacturer)
                    .WithMany(p => p.VehicleModels)
                    .HasForeignKey(d => d.ManufacturerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Vehicle_M__Manuf__18EBB532");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
