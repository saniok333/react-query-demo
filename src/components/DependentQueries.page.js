import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = (email) =>
  axios.get(`http://localhost:4000/users/${email}`);

const fetchCoursesByChannelId = (channelId) =>
  axios.get(`http://localhost:4000/channels/${channelId}`);

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.data.channelId;
  const { data: { data: { courses = [] } = {} } = {} } = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );
  return (
    <>
      <div>DependentQueriesPage</div>
      {courses.map((course) => (
        <div key={course}>{course}</div>
      ))}
    </>
  );
};
