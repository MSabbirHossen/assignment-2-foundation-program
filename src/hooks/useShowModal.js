import { useState, useCallback } from "react";
import { fetchShowDetails } from "../services/tvmazeApi";

/**
 * Custom Hook for Modal State & Data Fetching (Single Responsibility Principle)
 */
export function useShowModalState() {
  const [selectedShow, setSelectedShow] = useState(null);
  const [modalDetails, setModalDetails] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const openModal = useCallback(async (show) => {
    setSelectedShow(show);
    setModalDetails(show);
    setModalLoading(true);

    try {
      const fullData = await fetchShowDetails(show.id);
      setModalDetails(fullData);
    } catch (error) {
      console.error("[useShowModal] Failed to fetch show details:", error);
    } finally {
      setModalLoading(false);
    }
  }, []);

  const closeModal = useCallback(() => {
    setSelectedShow(null);
    setModalDetails(null);
  }, []);

  return {
    selectedShow,
    modalDetails,
    modalLoading,
    openModal,
    closeModal,
  };
}
