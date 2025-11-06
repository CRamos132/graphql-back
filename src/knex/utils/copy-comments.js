import { knex } from '../index'
import { comments } from '../../../db.json'
import { dateIsoToMySQL } from './date-iso-to-mysql'

const commentsForDb = comments.map(comment => {
  return {
    comment: comment.comment,
    user_id: comment.userId,
    post_id: comment.postId,
    created_at: dateIsoToMySQL(comment.createdAt)
  }
})

// knex('comments').insert(commentsForDb)
//   .then(res => console.log('res', res))
//   .catch(error => console.log('error', error))
//   .finally(() => knex.destroy())