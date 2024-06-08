using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using DnDApi.Database;
using DnDApi.ViewModels;
using Microsoft.AspNetCore.Identity;
using DnDApi.Factory;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.Certificate;
using DnDApi.Controllers;
using DnDApi.Database.Repository.Tracking;

namespace DnDApi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

        
    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

      services.AddScoped<IuserRepository, userRepository>();
      services.AddScoped<IcityRepos, cityRepos>();
      services.AddScoped<IsuburbRepos, suburbRepos>();
      services.AddScoped<IstreetRepos, streetRepos>();
      services.AddScoped<IaddressRepos, addressRepos>();
      services.AddScoped<IcompanyRepos, companyRepos>();
      services.AddScoped<IvehicleRepos, vehicleRepos>();
      services.AddScoped<IvehicleClassRepos, vehicleClassRepos>();
      services.AddScoped<IvehicleMakeRepos, vehicleMakeRepos>();
      services.AddScoped<IvehicleModelRepos, vehicleModelRepos>();
      services.AddScoped<IprojectRepos, projectRepos>();
      services.AddScoped<IparcelRepos, parcelRepos>();
      services.AddScoped<IparcelConfidentRepos, parcelConfidentialityRepos>();
      services.AddScoped<IparcelPriorityRepos, parcelPriorityRepos>();
      services.AddScoped<IparcelTypeRepos, parcelTypeRepos>();
      services.AddScoped<IbookingStatusRepos, bookingStatusRepos>();
      services.AddScoped<IbookingTypeRepos, bookingTypeRepos>();
      services.AddScoped<IbookingRepos, bookingRepos>();
      services.AddScoped<IeventRepos, eventRepos>();
      services.AddScoped<IfuelRepos, fuelRepos>();
      services.AddScoped<ItitleRepos, TitleRepos>();
      services.AddScoped<ImaintenanceRepos, MaintenanceRepos>();
      services.AddScoped<ImechanicRepos, mechanicRepos>();
      services.Configure<EmailConfig>(Configuration.GetSection("EmailConfig"));
      services.AddScoped<IemailRepos, emailRepos>();
      services.AddScoped<IclientInformationRepos, clientInformationRepos>();
      services.AddScoped<IclientEmployeeConnection, clientEmployeeConnection>();
      services.AddScoped<IratingRepos, ratingRepos>();
      services.AddScoped<IdriverRatingRepos, driverRatingRepos>();
      services.AddScoped<IlicenseCodeRepos, licenseCodeRepos>();
      services.AddScoped<IlicenseRepos, licenseRepos>();
      services.AddScoped<IdriverInformationRepos, driverInformationRepos>();
      services.AddScoped<ImaintenanceRepos, MaintenanceRepos>();
      services.AddScoped<ImechanicRepos, mechanicRepos>();
      services.AddScoped<IincidentRepos, incidentRepos>();
      services.AddScoped<IincidentStatusRepos, incidentStatusRepos>();
      services.AddScoped<IdateRepos, dateRepos>();
      services.AddScoped<ItimeRepos, timeRepos>();
      services.AddScoped<IemailRepos, emailRepos>();
      services.AddScoped<IfuelPriceRepos, fuelPriceRepos>();
      services.Configure<EmailConfig>(Configuration.GetSection("EmailConfig"));
      services.AddScoped<IdriverScheduleRepos, driverScheduleRepos>();
      services.AddTransient<AppDbContext>();
      services.AddScoped<IinspectionRepos, InspectionRepos>();
      services.AddScoped<IdriverLocationRepos, driverLocationRepos>();

      services.AddScoped<IUserClaimsPrincipalFactory<AppUser>, LoginClaimsPrincipalFactory>();

      services.AddAuthentication(CertificateAuthenticationDefaults.AuthenticationScheme).AddCertificate();

      services.AddIdentity<AppUser, IdentityRole>(options =>
      {
        options.Password.RequireUppercase = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireDigit = false;
        options.Password.RequiredLength = 0;
        options.User.RequireUniqueEmail = true;
      })
      .AddEntityFrameworkStores<AppDbContext>()
      .AddDefaultTokenProviders()
      .AddRoles<IdentityRole>();

      services.AddCors(options => options.AddDefaultPolicy(
          builder =>
          {
            builder.AllowAnyHeader();       
            builder.AllowAnyMethod();
            builder.AllowAnyOrigin();
          }));

      services.AddAuthentication()
      .AddCookie();
      //.AddJwtBearer(options =>
      //{
      //  options.TokenValidationParameters = new TokenValidationParameters()
      //  {
      //    ValidIssuer = Configuration["Tokens:Issuer"],
      //    ValidAudience = Configuration["Tokens:Audience"],
      //    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"]))
      //  };
      //});

      //services.AddAuthorization(options =>
      //{
      //  options.AddPolicy("RequireAdminRole",
      //    policy => policy.RequireRole("Admin"));
      //});
            
      services.AddControllers();
      services.AddSwaggerGen();
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "DnDApi", Version = "v1" });
        //c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        //{
        //  In = ParameterLocation.Header,
        //  Description = "Add Bearer Token",
        //  Name = "Authorization",
        //  Type = SecuritySchemeType.Http,
        //  BearerFormat = "JWT",
        //  Scheme = "bearer"
        //});
        //c.AddSecurityRequirement(new OpenApiSecurityRequirement
        //{
        //  {
        //    new OpenApiSecurityScheme
        //    {
        //      Reference = new OpenApiReference
        //      {
        //        Type = ReferenceType.SecurityScheme,
        //        Id = "Bearer"
        //      }
        //    },
        //    new string[] {}
        //  }
        //});
      });
      services.Configure<DataProtectionTokenProviderOptions>(options =>
      {
        options.TokenLifespan = TimeSpan.FromHours(5);
      });
    }
    

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
          app.UseDeveloperExceptionPage();
          app.UseSwagger();
          app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "DnDApi v1"));
      }

      app.UseHttpsRedirection();
      app.UseCors();

      app.UseRouting();

      app.UseCors();
      app.UseAuthentication();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
          endpoints.MapControllers();
      });
    }
  }
}

