import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useNavigate } from "react-router-dom"
import { fetchCandidates } from "../../redux/slices/candidatesSlice"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { DataStatus } from "../../types/redux"
import { color } from "chart.js/helpers"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Statistics() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)
  const { candidates, status, error } = useAppSelector(
    (state) => state.candidates
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (user?._id && !user?.isAdmin) {
      navigate("/votes")
    }
    if (!user?._id) navigate("/login")
    if (user?._id && user?.isAdmin) {
      dispatch(fetchCandidates())
    }
  }, [user, navigate, dispatch])

  const data = {
    labels: candidates.map((candidate) => candidate.name),
    datasets: [
      {
        label: "",
        data: candidates.map((candidate) => candidate.votes),
        backgroundColor: "rgba(75, 192, 192, 0.9)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1.5,
        borderRadius: 5,
        barThickness: 25,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Candidates votes chart",
        color: "rgba(78, 192, 192, 1)",
        font: {
          size: 24, // Make the title font size larger
          weight: "bold" as const,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(78, 192, 192, 1)",
          font: {
            size: 15, // Increase the font size of the x-axis labels
          },
          
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
          padding: 1
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(78, 192, 192, 1)",
          font: {
            size: 15, // Increase the font size of the y-axis labels
          },
          
        },
      },
    },
  }

  return (
    <div className="chart-container">
      <h1>Statistics</h1>
      {status === DataStatus.LOADING && <p>Loading...</p>}
      {status === DataStatus.FAILED && <p>Error: {error}</p>}
      {status === DataStatus.SUCCSES && (
        <div style={{ position: "relative", width: "100%", height: "400px" }}>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  )
}
