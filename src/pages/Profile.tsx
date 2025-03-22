
import React from 'react';
import PageContainer from '@/components/pages/index/PageContainer';
import ProfileForm from '@/components/profile/ProfileForm';
import useAuthentication from '@/hooks/useAuthentication';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { isAuthenticated, authLoading } = useAuthentication();

  if (authLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageContainer>
      <div className="container max-w-4xl py-8 px-4 sm:px-6">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>
        <ProfileForm />
      </div>
    </PageContainer>
  );
};

export default Profile;
