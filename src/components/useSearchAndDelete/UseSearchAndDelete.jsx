import { useState, useCallback } from 'react';

const useSearchAndDelete = (searchById, searchAll, deleteById) => {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(true);
    const [noResults, setNoResults] = useState(false);
    const [error, setError] = useState(false);

    const fetchItemById = useCallback(async (id) => {
        if (!id) {
            setError(true);
            return;
        }
        setError(false);
        const data = await searchById(id);
        setItems(data ? [data] : []);
        setShowForm(false);
        setNoResults(!data);
    }, [searchById]);

    const fetchAllItems = useCallback(async () => {
        setError(false);
        const data = await searchAll();
        setItems(data || []);
        setShowForm(false);
        setNoResults(!(data && data.length > 0));
    }, [searchAll]);

    const resetSearch = useCallback(() => {
        setShowForm(true);
        setItems([]);
        setNoResults(false);
        setError(false);
    }, []);

    const handleDelete = useCallback(async (id) => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
        if (confirmed) {
            const success = await deleteById(id);
            if (success) {
                setItems((prevItems) => prevItems.filter(item => item.id !== id));
            } else {
                alert("Error al eliminar el elemento");
            }
        }
    }, [deleteById]);

    return {
        items,
        showForm,
        noResults,
        error,
        fetchItemById,
        fetchAllItems,
        resetSearch,
        handleDelete,
    };
};

export default useSearchAndDelete;