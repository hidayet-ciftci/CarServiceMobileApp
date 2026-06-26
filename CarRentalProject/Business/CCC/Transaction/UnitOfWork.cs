using Core.CrossCuttingConcerns.Transaction;
using DataAccess.Concrete.EntityFramework;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DataAccess.Transaction
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly CarRentalContext _context;
        private IDbContextTransaction _transaction;

        public UnitOfWork(CarRentalContext context)
        {
            _context = context;
        }

        public void BeginTransaction() => _transaction = _context.Database.BeginTransaction();
        public void Commit() => _transaction.Commit();
        public void Rollback() => _transaction.Rollback();
        public void SaveChanges() => _context.SaveChanges();
        public void Dispose() => _context.Dispose();
    }
}
