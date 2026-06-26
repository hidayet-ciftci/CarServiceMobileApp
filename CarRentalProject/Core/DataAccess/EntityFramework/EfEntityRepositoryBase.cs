using Core.Entities.Abstract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.DataAccess.EfRepositoryContext
{
    public class EfEntityRepositoryBase<TEntity, TContext> : IEntityRepository<TEntity>
        where TEntity: class, IEntity, new()
        where TContext : DbContext, new()
    {
        public void Add(TEntity entity)
        {
            using (TContext context= new TContext())
            {
                var addedEntity = context.Entry(entity);
                addedEntity.State = EntityState.Added;
                context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            using (TContext context = new TContext())
            {
                var deletedEntity = context.Set<TEntity>().Find(id);
                if (deletedEntity != null)
                {
                    context.Remove(deletedEntity);
                    context.SaveChanges();
                }
                
            }
        }

        public List<TEntity> GetAll()
        {
            using (TContext context = new TContext())
            {
                return context.Set<TEntity>().ToList();    
            }
        }

        public TEntity GetOne(Expression<Func<TEntity, bool>> filter)
        {
            using (TContext context = new TContext())
            {
                return context.Set<TEntity>().SingleOrDefault(filter);
            }
        }

        public void Update(TEntity entity)
        {
            using (TContext context = new TContext())
            {
                var UpdatedEntity = context.Entry(entity);
                UpdatedEntity.State = EntityState.Modified;
                context.SaveChanges();
            }
        }
    }
}
