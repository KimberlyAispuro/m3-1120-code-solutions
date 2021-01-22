/* eslint-disable no-console */
const express = require('express');
const app = express();
const pg = require('pg');
// only create ONE pool for your whole server
const db = new pg.Pool({
  connectionString: 'postgres://dev:lfz@localhost/studentGradeTable'
});

app.use(express.json());

app.get('/api/grades', (req, res, next) => {
  const sql = `
      select * 
        from "grades"
`;
  db.query(sql)
    .then(result => {
      const grades = result.rows;
      res.status(200).json(grades);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error ocurred.'
      });
    });
});

app.post('/api/grades', (req, res, next) => {
  const text = `
      insert into "grades"(name,course,score) 
          values ($1,$2,$3) 
        returning *
`;
  const values = [req.body.name, req.body.course, req.body.score];
  if (!req.body.name || !req.body.course || !req.body.score) {
    res.status(400).json({
      error: 'Missing item. Must include name, course, and score.'
    });
    return;
  } else if (req.body.score < 0 || req.body.score > 100) {
    res.status(400).json({
      error: 'Invalid score. Must be a number between 1 - 100'
    });
    return;
  }
  db.query(text, values)
    .then(result => {
      const grade = result.rows[0];
      res.status(201).json(grade);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error ocurred.'
      });
    });
});

app.put('/api/grades/:gradeId', (req, res, next) => {
  const gradeId = Number(req.params.gradeId);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: 'Invalid grade Id. Must be a positive integer'
    });
    return;
  } else if (!req.body.name || !req.body.course || !req.body.score) {
    res.status(400).json({
      error: 'Missing item. Must include name, course, and score.'
    });
    return;
  } else if (req.body.score < 0 || req.body.score > 100) {
    res.status(400).json({
      error: 'Invalid score. Must be a number between 1 - 100.'
    });
    return;
  }

  const text = `
    update "grades"
      set "name"= $1,
          "course"= $2,
          "score"= $3
      where "gradeId"= $4
      returning *
  `;
  const values = [req.body.name, req.body.course, req.body.score, gradeId];

  db.query(text, values)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({
          error: `Cannot find grade with gradeId ${gradeId}`
        });
      } else {
        res.status(200).json(grade);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error ocurred.'
      });
    });
});

app.delete('/api/grades/:gradeId', (req, res, next) => {
  const gradeId = Number(req.params.gradeId);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: 'Invalid grade Id. Must be a positive integer'
    });
    return;
  }

  const text = `
    delete from "grades"
    where "gradeId"= $1
    returning *
  `;
  const values = [gradeId];

  db.query(text, values)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({
          error: `Cannot find grade with gradeId ${gradeId}`
        });
      } else {
        res.status(204).json(grade);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error ocurred.'
      });
    });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
