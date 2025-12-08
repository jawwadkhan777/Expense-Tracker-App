import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../../components/layouts/DashBoardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/cards/InfoCard';
import {IoMdCard} from 'react-icons/io'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { addThousandsSeperator } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import RecentTransactions from '../../components/dashBoard/RecentTransactions';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchdashboardData = async ()=> {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

      if(response.data) {
        setDashboardData(response.data.data);        
      }
    } catch(error) {
      console.log("Something went wrong, please try again.", error);
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=> {
    fetchdashboardData(); 
  }, [])

  return (
    <DashBoardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard 
          icon={<IoMdCard />}
          lable="Total Balance"
          value={addThousandsSeperator(dashboardData?.totalBalance || 0)}
          color="bg-primary"
          />
          <InfoCard 
          icon={<LuWalletMinimal />}
          lable="Total Income"
          value={addThousandsSeperator(dashboardData?.totalIncome || 0)}
          color="bg-yellow-500"
          />
          <InfoCard 
          icon={<LuHandCoins />}
          lable="Total Expense"
          value={addThousandsSeperator(dashboardData?.totalExpense || 0)}
          color="bg-red-500"
          />
        
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onSeeMore= {()=> navigate('/expense')}
          />
        </div>
      </div>
    </DashBoardLayout>
  )
}

export default Home